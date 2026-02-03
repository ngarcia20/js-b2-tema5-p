const { createApp, ref, computed } = Vue;

const app = createApp({
  setup() {
    const figures = ["Cuadrado", "Rectángulo", "Círculo", "Triángulo"];
    const figure = ref("Cuadrado");

    const side = ref(0);
    const base = ref(0);
    const height = ref(0);
    const radius = ref(0);

    const area = computed(() => {
      switch (figure.value) {
        case "Cuadrado":
          return side.value ** 2;
        case "Rectángulo":
          return base.value * height.value;
        case "Círculo":
          return Math.PI * radius.value ** 2;
        case "Triángulo":
          return (base.value * height.value) / 2;
        default:
          return 0;
      }
    });

    const formula = computed(() => {
      switch (figure.value) {
        case "Cuadrado":
          return `Área = lado² = ${side.value}²`;
        case "Rectángulo":
          return `Área = b × h = ${base.value} × ${height.value}`;
        case "Círculo":
          return `Área = π × r² = π × ${radius.value}²`;
        case "Triángulo":
          return `Área = (b × h) / 2 = (${base.value} × ${height.value}) / 2`;
        default:
          return "";
      }
    });

    return {
      figures,
      figure,
      side,
      base,
      height,
      radius,
      area,
      formula
    };
  }
});

app.mount("#vueApp");