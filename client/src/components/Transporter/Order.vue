<template >
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div>
      <p>{{element.title}}</p>
      <p>{{element.date}}</p>
    </div>
  </div>
</template>
<script>

import draggable from "vuedraggable";

export default {
  name: "Order",
  components: {
    draggable,
  },
  props: {
    element:Object,
    task: {
      type: Object,
      default: () => ({})
    }
  },
};
</script>
