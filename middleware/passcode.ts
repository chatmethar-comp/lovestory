export default defineNuxtRouteMiddleware((to, from)=>{
    const filledpasscode = useCookie("filledpasscode");
    if(!filledpasscode.value){
        return navigateTo("/");
    }
})