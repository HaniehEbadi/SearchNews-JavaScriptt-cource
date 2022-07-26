function searchText(event) {
  event.preventDefault()
  let form = new FormData(event.target) 
  let text = form.get('text') 
  if (!text) {
    let x = document.getElementById('demo')
    x.style.display = 'block'
    x.innerHTML = "Please enter sth"
    setTimeout(() => {x.style.display = 'none'},2000)
  } else {
    cleanSearch('https://newsapi.org/v2/everything?q='+ text +'&apiKey=6037628459954a4f93a264816f308340')
  }
  document.getElementsByName('text')[0].value = ''
}

async function cleanSearch(file) {
  let myObject = await fetch(file)
  let myText = await myObject.text()
  let i = myText.indexOf('[')

  let text = ''
  for (let k = 0; k < 10; k++) {
    i = myText.indexOf('{',i)
    let j = myText.indexOf('}',i)
    j = myText.indexOf('}',j+1)
    item = myText.slice(i,j+1)
    i = j+1

    let title = cut('title')
    let url = cut('url')
    let publishedAt = cut('publishedAt')
    let n = publishedAt.indexOf('T')
    publishedAt = publishedAt.slice(0,n)
    let content = cut('content')
    //let urlToImage = cut('urlToImage')

    let d = document.createElement('div')
    document.body.appendChild(d)

    let newsPage = document.createElement('a')
    let newsPageT = document.createTextNode(title)
    newsPage.setAttribute('href', url)
    d.appendChild(newsPage)
    newsPage.appendChild(newsPageT)

    let p = document.createElement('p')
    let pT= document.createTextNode(content)
    d.appendChild(p)
    p.appendChild(pT)

    // let img = document.createElement('img')
    // img.setAttribute('src', urlToImage)
    // d.appendChild(img)

    let publishedDate = document.createElement('p')
    let publishedDateT = document.createTextNode(publishedAt)
    d.appendChild(publishedDate)
    publishedDate.appendChild(publishedDateT)

    text += ` ${publishedAt} <br><br>`

    br(publishedDate)
    br(publishedDate)
  }
  
  function cut(some) {
    let i = item.indexOf(some)
    i += 3 + some.length
    let j = item.indexOf('"',i) 
    let result = item.slice(i,j)
    return result
  }

  function br(elem) {
    let br = document.createElement('br')
    elem.appendChild(br)
  }
}