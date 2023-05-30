<script>
  import { createEventDispatcher } from 'svelte';
  export let id = 0;
  export let title;
  export let options = [];
  const dispatch = createEventDispatcher();
  function handleDelete() {
    options = options.filter((e, i) => i !== id);
    dispatch('update', options);
  }
</script>

<div class="flex items-center gap-4 p-4">
  <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
    <span class="text-lg"><strong>{id}</strong></span>
  </div>
  <div class="flex flex-col">
    <strong>{title}</strong>
  </div>
  <button class="ml-auto text-red-500" on:click={handleDelete}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</div>
