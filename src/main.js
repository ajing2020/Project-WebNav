const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://acfun.cn' },
    { logo: 'B', url: 'https://bilibili.com' },
]

const simplifyUrl = url => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('wwww.', '')
        .replace(/\/.*/, '');
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', e => {
            e.stopPropagation()
            console.log(hashMap);
            hashMap.splice(index, 1)
            render()
        })
        window.onbeforeunload = () => {
            const string = JSON.stringify(hashMap)
            window.localStorage.setItem('x', string)
        }
    })
}
render();

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是什么')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url);
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logeType: 'text',
            url: url
        })

        render();
    })

$(document).on('keypress', (e) => {
    const { key } = e
    // for (let i = 0; i < hashMap.length; i++) {
    //     if (hashMap[i].logo.toLowerCase() === key) {
    //         window.open(hashMap[i].url)
    //     }
    // }
    hashMap.forEach((item) => {
        if (item.logo.toLowerCase() === key) {
            window.open(item.url)
        }
    })
})