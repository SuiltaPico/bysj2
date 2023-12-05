# 代理
$env:__PROXY__ = "http://127.0.0.1:7890"

$env:ELECTRON_GET_USE_PROXY = $env:__PROXY__
$env:GLOBAL_AGENT_HTTPS_PROXY = $env:__PROXY__
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:npm_config_electron_mirror = "http://npm.taobao.org/mirrors/electron/"
pnpm install
