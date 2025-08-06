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



  {
  "folke/tokyonight.nvim",
  config = function()
    vim.cmd([[colorscheme tokyonight]])
  end,
  },


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

  -- Git
  {
    "lewis6991/gitsigns.nvim",
    config = function()
      require("gitsigns").setup()
    end,
  },

  -- Spectre
  {
    "nvim-pack/nvim-spectre",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      require("spectre").setup()
    end,
  },

  -- Lightbulb
  {
    "kosayoda/nvim-lightbulb",
    dependencies = { "antoinemadec/FixCursorHold.nvim" },
    config = function()
      require("nvim-lightbulb").setup({
        autocmd = { enabled = true }
      })
    end,
  },

  -- LSP Status
  {
    "j-hui/fidget.nvim",
    tag = "legacy",
    config = function()
      require("fidget").setup({})
    end,
  },




  -- Load separated plugin configs
  require("plugins.autocomplete"),
  require("plugins.nvim-tree"),
  require("plugins.lualine"),
  require("plugins.autopairs")
})
