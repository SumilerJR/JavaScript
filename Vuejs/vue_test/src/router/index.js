//改文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from '../pages/About';
import Home from '../pages/Home';
import Message from '../pages/Message';
import News from '../pages/News';
import Detail from '../pages/Detail';

export default new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: "xiangqing",
                            path: 'detail',
                            component: Detail,
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
                    path: 'news',
                    component: News,
                }
            ]
        }
    ]
});