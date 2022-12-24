<template>
  <div class="container">
    <div class="row">
      <ReadingSpeedTest />
    </div>
  </div>
</template>

<script>
import ReadingSpeedTest from "@/components/ReadingSpeedTest";

export default {
  name: "ReadingSpeed",
  components: {
    ReadingSpeedTest,
  },
  data() {
    return {
      isTesting: false,
      isCanceled: true,
      isDone: false,
      readingTimeStart: 0,
      readingDuration: 0,
      results: [],
    };
  },
  computed: {
    getId() {
      return this.$store.getters.id;
    },
  },
};
</script>
