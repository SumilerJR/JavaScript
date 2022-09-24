//改文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from '../pages/About';
import Home from '../pages/Home';
import Message from '../pages/Message';
import News from '../pages/News';
import Detail from '../pages/Detail';

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: { title: '关于' },

        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: { title: '首页' },
            children: [
                {
                    name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    meta: { title: '消息', isAuth: true },
                    children: [
                        {
                            name: "xiangqing",
                            path: 'detail',
                            component: Detail,
                            meta: { title: '详情', isAuth: true },
                            // props的第一种写法，值为对象
                            // props: { a: 1, b: 'hello' }
                            //第二种写法，值为布尔值
                            // props: true,
                            //第三种写法，值为函数
                            props($route) {
                                return { id: $route.query.id, title: $route.query.title };
                            }
                        }
                    ]
                },
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: { title: '新闻', isAuth: true },
                    beforeEnter: (to, from, next) => {
                        console.log('@@@@@@@', to, from, next);//独享路由守卫
                        if (to.meta.isAuth) { //判断是否需要鉴权
                            if (localStorage.getItem('school') === 'qinghua') {
                                next();
                            } else {
                                alert('无权限查看！');
                            }
                        } else {
                            next();
                        }
                    }
                }
            ]
        }
    ]
});

//全局前置路由守卫——初始化的时候被调用、每次路由切换之前被调用
// router.beforeEach((to, from, next) => {
//     console.log('前置路由守卫', to, from, next);
//     if (to.meta.isAuth) { //判断是否需要鉴权
//         if (localStorage.getItem('school') === 'qinghua') {
//             next();
//         } else {
//             alert('无权限查看！');
//         }
//     } else {
//         next();
//     }
// });

router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from);
    document.title = to.meta.title;//在页面跳转成功之后修改页面的标题

});
export default router;