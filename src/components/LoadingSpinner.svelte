<script>
  export let size = 'medium';
</script>

{#if size === 'small'}
  <div class="spinner" style="--size: 16px;" />
{:else if size === 'large'}
  <div class="spinner" style="--size: 32px;" />
{:else}
  <div class="spinner" />
{/if}

<style>
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid rgb(245 158 11);
    border-radius: 50%;
    width: var(--size, 24px);
    height: var(--size, 24px);
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
