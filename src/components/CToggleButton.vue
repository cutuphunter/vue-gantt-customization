<template>
    <div class="g-gantt-toggle">
        <button class="toggle-button" @click="toggle">{{ isOpen ? '-' : '+' }}</button>
    </div>
</template>
  
<script>
export default {
    name: 'CToggleButton',
    props: {
        title: String,
        description: String,
        // isOpen: {
        //     type:boolean,
        //     default:false,
        // }
        customHandle: {
            type : Function,
            default: (param)=>{}
        }
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggle(e){
            this.isOpen = !this.isOpen
            // console.log('isOpen', isOpen.value)
            this.customHandle(this.isOpen);
        }
    },
};
</script>
  
<style scoped>
/* Your styling here */
.g-gantt-toggle {
    position: absolute;
    top: 0;
    left: 0px;
    padding: 0px 8px;
    display: flex;
    align-items: center;
    /* height: 20%; */
    min-height: 20px;
    font-size: 0.8em;
    font-weight: bold;
    border-bottom-right-radius: 6px;
    background: transparent;
    z-index: 5;
}

.toggle-button {
    width: 20px;
    color: red;
    border-radius: 5px;
    border: 1px solid green;
}
</style>