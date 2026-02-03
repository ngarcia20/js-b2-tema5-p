const { createApp, ref, computed } = Vue;

const app = createApp({
  setup() {
    const newContact = ref("");

    const contacts = ref([]);

    const addContact = () => {
      if (newContact.value.trim() === "") {
        return;
      }

      contacts.value.push(newContact.value.trim());
      newContact.value = "";
    };

    const totalContacts = computed(() => {
      return contacts.value.length;
    });

    return {
      newContact,
      contacts,
      addContact,
      totalContacts,
    };
  },
});

app.mount("#vueApp");
