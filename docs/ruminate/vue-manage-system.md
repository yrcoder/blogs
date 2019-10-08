# vue-manage-system 源码阅读
代码我都看的懂，也没有什么高大上的地方，用了几个插件，便可以得到星星8K+。所以，一个好的项目最主要帮人解决问题。
我要学的设计模式呢？怎么都看不到。
不过写的真的很难看。
[ant-design-pro-vue 源码阅读](https://pro.loacg.com)
虽然看着好看一些，但是方案给的的确不适合开箱即用

## 小知识点

1. 全屏: `document.exitFullscreen() document.documentElementre.questFullscreen();`
```js
// 全屏事件
handleFullScreen() {
    let element = document.documentElement;
    if (this.fullscreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
        }
    }
    this.fullscreen = !this.fullscreen;
}
```

2. bus
```js
// bus.js
import Vue from 'vue';

// 使用 Event Bus
const bus = new Vue();

export default bus;

// 应用
bus.$emit('collapse', this.collapse);
bus.$on('collapse-content', msg => {
    this.collapse = msg;
});
// 还可以在main.js中用为全局的组件
Vue.prototype.$bus = bus
```

3. i18n

```js
// main.js
import VueI18n from 'vue-i18n';
const messages = {
    'zh': {
        i18n: {
            breadcrumb: '国际化产品',
            tips: '通过切换语言按钮，来改变当前内容的语言。',
            btn: '切换英文',
            title1: '常用用法',
            p1: '要是你把你的秘密告诉了风，那就别怪风把它带给树。',
            p2: '没有什么比信念更能支撑我们度过艰难的时光了。',
            p3: '只要能把自己的事做好，并让自己快乐，你就领先于大多数人了。',
            title2: '组件插值',
            info: 'Element组件需要国际化，请参考 {action}。',
            value: '文档'
        }
    },
    'en': {
        i18n: {
            breadcrumb: 'International Products',
            tips: 'Click on the button to change the current language. ',
            btn: 'Switch Chinese',
            title1: 'Common usage',
            p1: "If you reveal your secrets to the wind you should not blame the wind for  revealing them to the trees.",
            p2: "Nothing can help us endure dark times better than our faith. ",
            p3: "If you can do what you do best and be happy, you're further along in life  than most people.",
            title2: 'Component interpolation',
            info: 'The default language of Element is Chinese. If you wish to use another language, please refer to the {action}.',
            value: 'documentation'
        }
    }
}

const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.use(VueI18n);

new Vue({
    i18n,
}).$mount('#app');
```

4. element.js
```js
import ElementUI from 'element-ui';
Vue.use(ElementUI, {
    size: 'small'
});
```

5. 权限管理
router.beforeEach
```js
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
```

6. 可拖拽指令
```js
import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');

        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (() => {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr];
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr];
            }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const screenWidth = document.body.clientWidth; // body当前宽度
            const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

            const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
            const dragDomheight = dragDom.offsetHeight; // 对话框高度

            const minDragDomLeft = dragDom.offsetLeft;
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

            const minDragDomTop = dragDom.offsetTop;
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


            // 获取到的值带px 正则匹配替换
            let styL = sty(dragDom, 'left');
            let styT = sty(dragDom, 'top');

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
            } else {
                styL = +styL.replace(/\px/g, '');
                styT = +styT.replace(/\px/g, '');
            };

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft);
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop);
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})

// 应用
<el-dialog v-dialogDrag title="拖拽弹框" center :visible.sync="visible" width="30%">
</el-dialog>
```
