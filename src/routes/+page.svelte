<script>
  import { afterUpdate } from 'svelte';

  import ListItem from '../components/ListItem.svelte';
  import ResponseItem from '../components/ResponseItem.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { onMount } from 'svelte';

  let options = [];
  let containerRef;
  let responses = [];
  let jsonData = '';

  let isLoading = false;

  let currentOption = '';

  function addItem() {
    if (currentOption !== '' && options.length < 11) {
      options = [...options, currentOption];
      currentOption = '';
    }
  }

  function scrollToLastMessage() {
    containerRef.scrollTo(0, containerRef.scrollHeight);
  }

  afterUpdate(() => {
    scrollToLastMessage();
  });

  function isOptionsEmpty(arr) {
    return arr.length === 0;
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  }

  onMount(async () => {
    // const res = await fetch(`/tutorial/api/album`);
    // photos = await res.json();
    // isLoading = false;
  });

  function updateOptions(newValue) {
    console.log('here is the new value:');
    console.log(newValue);
    options = newValue.detail;
  }

  async function handleSubmit(options) {
    console.log('dekhi');
    isLoading = true;
    const res = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({
        options
      })
    });
    console.log('res.body');
    console.log(res.body);
    const json = await res.json();
    console.log('from handle submit12');
    responses = json['responses'];
    console.log('from handle HERE');
    let jsonString = JSON.stringify(responses, null, 2);
    jsonString = jsonString.replace(/\n/g, '');

    // Remove extra indentation
    jsonString = jsonString.replace(/\s{2,}/g, '');

    // Parse the JSON
    jsonData = JSON.parse(jsonString);
    console.log('THE TYPE OF JSONDATA');
    console.log(typeof jsonData);
    jsonData = JSON.parse(jsonData);
    console.log(typeof jsonData);
    console.log('from handle MAYBE HGERERE');
    isLoading = false;
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 h-full">
  <div class="p-20 bg-yellow-50">
    <div>
      <p class="pb-10 font-spartan text-4xl">If you like...</p>
    </div>

    <div class="relative">
      <div
        class="overflow-hidden max-h-96 relative max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col dark:divide-slate-200/5"
      >
        <div class="chat-item overflow-y-auto divide-y" bind:this={containerRef}>
          {#each options as option, i (i)}
            <ListItem id={i} title={option} {options} on:update={updateOptions} />
          {/each}
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-4 bg-white">
          <div class="flex">
            <input
              type="text"
              placeholder="Enter your choice"
              bind:value={currentOption}
              on:keydown={handleKeyDown}
              class="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <button
              on:click={addItem}
              class="px-4 py-2 bg-amber-400 text-black rounded-r-full hover:bg-amber-500 focus:outline-none"
              >Add</button
            >
          </div>
        </div>
      </div>

      <div class="w-full md:w-96 mx-auto justify-end flex my-2">
        {#if !isOptionsEmpty(options)}
          <button
            class="px-4 py-2 rounded-full bg-amber-400 text-black hover:bg-amber-500 focus:outline-none shadow-lg"
            on:click={handleSubmit(options)}
          >
            Generate
          </button>
        {/if}
      </div>
    </div>
  </div>
  <div class="relative p-20 bg-amber-100">
    <p class="pb-10 font-spartan text-4xl text-black space-y-10">You might also like...</p>
    <!-- <div
    class="overflow-y-auto max-h-96 max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5"
  >
    {#each jsonData as item (item.id)}
      
        <ResponseItem id={item.id} title={item.name} subtitle={item.details} url={item.url} />
     
    {:else}
      <LoadingSpinner size="medium" />
    {/each}
  </div> -->

    {#if isLoading}
      <div class="flex justify-center items-center max-h-96 mt-16">
        <LoadingSpinner size="medium" />
      </div>
    {:else}
      <div
        class="overflow-y-auto max-h-96 max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg rounded-xl flex flex-col divide-y dark:divide-slate-200/5"
      >
        {#each jsonData as item (item.id)}
          <ResponseItem id={item.id} title={item.name} subtitle={item.details} url={item.url} />
        {/each}
      </div>
    {/if}

    <div class="absolute bottom-0 right-0 text-gray-800 p-4">
      <p class="text-end">Made with ChatGPT & Svelte</p>
      <p class="text-end">by Sadat Daniel</p>
    </div>
  </div>
</div>

<style>
  .chat-item {
    margin-bottom: 70px;
    /* margin-bottom: 400px;  */
  }
</style>
