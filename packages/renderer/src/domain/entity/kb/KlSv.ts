import { Repository } from "typeorm";
import { KlCollectionEt } from "./KlCollection";
import {
  KlItemContext,
  KlItemORMEt,
  MountedKlItemContentEt,
  TextKlItemContentEt,
} from "./KlItem";
import { set_draft_time } from "/@/common/utils/typeorm";

type KlSvRepos = {
  collection_repo: Repository<KlCollectionEt>;
  item_orm_repo: Repository<KlItemORMEt>;
  text_item_repo: Repository<TextKlItemContentEt>;
  mounted_item_repo: Repository<MountedKlItemContentEt>;
};

export class KlSv {
  repos: KlSvRepos;

  constructor(repos: KlSvRepos) {
    this.repos = repos;
  }

  async create_item<T extends KlItemContext["type"]>(
    name: string,
    content_type: T,
    content: (KlItemContext & { type: T })["content"]
  ) {
    let new_content!: KlItemContext;
    if (content_type === "mounted") {
      const content_draft = new MountedKlItemContentEt();
      content_draft.type = content_type;
      content_draft.content = content as MountedKlItemContentEt["content"];
      new_content = await this.repos.mounted_item_repo.save(content_draft);
    } else if (content_type === "text") {
      const content_draft = new TextKlItemContentEt();
      content_draft.type = content_type;
      content_draft.content = content as TextKlItemContentEt["content"];
      new_content = await this.repos.text_item_repo.save(content_draft);
    }

    const item_orm_draft = new KlItemORMEt();
    item_orm_draft.name = name;

    item_orm_draft.vector_id_list = [];
    item_orm_draft.parent_collection = [];

    item_orm_draft.content_type = content_type;
    item_orm_draft.content_id = new_content.id;

    set_draft_time(item_orm_draft);

    const item_orm = await this.repos.item_orm_repo.save(item_orm_draft);
    return item_orm;
  }

  async create_collection(name: string) {
    const collection_draft = new KlCollectionEt();
    collection_draft.name = name;
    collection_draft.item_children = [];

    set_draft_time(collection_draft);

    const collection = await this.repos.collection_repo.save(collection_draft);
    return collection;
  }

  async remove_item(id: string) {
    // TODO
  }
  async remove_collection(id: string) {
    // TODO
  }

  async get_item(id: string) {
    return await this.repos.item_orm_repo
      .createQueryBuilder("kl_item_orm_et")
      .leftJoinAndSelect(
        "kl_item_orm_et.parent_collections",
        "kl_collection_et"
      ).getMany();
    return await this.repos.item_orm_repo.findOneBy({
      id,
    });
  }

  async modify_item_parent_collections(
    item: KlItemORMEt,
    parent_collections: KlCollectionEt[]
  ) {
    item.parent_collection = parent_collections;
    return await this.repos.item_orm_repo.save(item);
  }
}
