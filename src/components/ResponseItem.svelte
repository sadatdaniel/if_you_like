<script>
  export let id = 0;
  export let title;
  export let subtitle;
  export let url;
</script>

<div class="flex items-center gap-4 p-4">
  <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
    <span class="text-lg"><strong>{id}</strong></span>
  </div>
  <div class="flex flex-col">
    <a href={url} target="_blank" class="text-slate-900 text-sm font-medium dark:text-slate-200">
      <strong>{title}</strong>
    </a>
    <span class="text-slate-500 text-sm font-medium dark:text-slate-400">{subtitle}</span>
  </div>
</div>
