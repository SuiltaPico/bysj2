const min = 100;
const max = 1000;

var data = [...Array(max).keys()]
  .slice(min)
  .map((it) => ({ name: it.toString(), value: it }));

var links = [];

for (var i = min; i <= max; i++) {
  let is_primes = true;
  for (var j = min; j <= i / 2; j++) {
    if (i % j === 0) {
      is_primes = false;
      links.push({
        source: i.toString(),
        target: j.toString(),
        arrow: 'arrow'
      });
    }
  }
  if (is_primes) {
    data[i - min].itemStyle = {
      color: '#faa'
    };
    // data[i - min].fixed = true
  }
}

myChart.setOption({
  title: {
    text: '数字之间质数关系的力引导布局Force Layout'
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      data: data,
      links: links,
      roam: true,
      force: {
        repulsion: 100, // 节点间的斥力因子
        edgeLength: 30, // 边的默认长度
        gravity: 0.1
      },
      label: {
        show: true
      },
      lineStyle: {
        color: '#0008'
      },
            edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: 10
    }
  ]
});
