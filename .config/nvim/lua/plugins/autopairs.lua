
return {
  "windwp/nvim-autopairs",
  config = function()
    local npairs = require("nvim-autopairs")
    npairs.setup({})

    local cmp_status_ok, cmp = pcall(require, "cmp")
    if not cmp_status_ok then
      return
    end

    local cmp_autopairs = require("nvim-autopairs.completion.cmp")
    cmp.event:on("confirm_done", cmp_autopairs.on_confirm_done())
  end,
}

