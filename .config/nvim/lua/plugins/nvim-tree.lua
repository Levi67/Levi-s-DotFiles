-- lua/plugins/nvim-tree.lua
return {
  "nvim-tree/nvim-tree.lua",
  dependencies = {
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    require("nvim-tree").setup({
      disable_netrw = true,
      hijack_netrw = true,
      view = {
        width = 30,
        side = "left",
      },
      renderer = {
        icons = {
          show = {
            git = true,
            folder = true,
            file = true,
            folder_arrow = true,
          },
        },
      },
      on_attach = function(bufnr)
        local api = require('nvim-tree.api')

        local function opts(desc)
          return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap=true, silent=true, nowait=true }
        end

        vim.keymap.set('n', 'u', api.tree.change_root_to_parent, opts('Up'))
        vim.keymap.set('n', 'q', api.tree.close, opts('Close'))
      end,
    })
  end,
}
