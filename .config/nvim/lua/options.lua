vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true
vim.opt.termguicolors = true
vim.opt.mouse = "a"
vim.g.mapleader = " "
--vim.opt.virtualedit = "all" -- For flying through the docs - Going into empty Spacevim
--vim.opt.scrolloff = 999     -- -"-
vim.opt.clipboard = "unnamedplus" -- For clipboard sharing



-- Basic keymap example
vim.keymap.set("n", "<leader>w", ":w<CR>")  -- Save with <Space>w
