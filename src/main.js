import {createApp} from 'vue'

import App from './App'
import components from '@/components/ui'
import router from "@/components/router/router";
import VIntersection from "@/components/directives/VIntersection";
import VFocus from "@/components/directives/VFocus";

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.directive('intersection', VIntersection)
app.directive('focus', VFocus)

app
    .use(router)
    .mount('#app');
