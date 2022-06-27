const $siteList = $(".siteList")
const $lastLi = $siteList.find("li.last")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo:"S",url:"https://segmentfault.com"},
  {logo:"I",url:"https://www.iconfont.cn"},
  {logo:"G",url:"https://github.com"},
  {logo:"D",url:"https://docs.emmet.io"},
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址")
  if (url.indexOf("http") !== 0) {
    url = "https://" + url
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem("x", string)
}

const key=$(document).on('keypress',(e)=>{
  const key=e.key
  hashMap.forEach((node)=>{
      console.log(node.logo)
      if(node.logo.toLowerCase()===key){
          console.log(node.logo)
          window.open(node.url)
      }
  })
})
$('.searchForm').on('keypress',(e)=>{
  e.stopPropagation()
})





