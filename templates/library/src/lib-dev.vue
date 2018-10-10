<script>
import { <%-componentNamePascal%>Sample } from './entry';
export default {
    name:  '<%-componentNamePascal%>LibDev', // vue library dev component
    components: {
        <%-componentNamePascal%>Sample,
    },
}
</script>

<template>
    <div class="<%-componentName%>-lib-dev">
        <<%-componentName%>-sample></<%-componentName%>-sample>
    </div>
</template>

<style scoped>
    .<%-componentName%>-lib-dev {
        display: block;
        width: 400px;
        margin: 25px auto;
    }
</style>
