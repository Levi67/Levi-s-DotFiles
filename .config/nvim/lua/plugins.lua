local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  -- Core plugins
  "nvim-lua/plenary.nvim",
  "nvim-tree/nvim-web-devicons",

  -- Telescope plugins
  { "nvim-telescope/telescope.nvim", tag = "0.1.5" },
  { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },

  -- Treesitter
  { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },

  -- LSP Core
  "neovim/nvim-lspconfig",
  "williamboman/mason.nvim",
  "williamboman/mason-lspconfig.nvim",

  -- TypeScript LSP tools
  {
    "pmizio/typescript-tools.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      require("typescript-tools").setup({})
    end,
  },

  -- Load separated plugin configs by requiring the files
  require("plugins.autocomplete"),
  require("plugins.nvim-tree"),
  require("plugins.lualine"),

})

