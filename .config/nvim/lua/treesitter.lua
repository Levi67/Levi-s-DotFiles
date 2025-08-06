require("nvim-treesitter.configs").setup({
  ensure_installed = {
    "c", "cpp", "rust", "kotlin", "java",
    "javascript", "typescript", "tsx", "css", "html", "lua", "xml"
  },
  highlight = {
    enable = true,
  },
})

