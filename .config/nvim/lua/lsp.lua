local lspconfig = require("lspconfig")
local capabilities = require("cmp_nvim_lsp").default_capabilities()

local servers = {

    -- Install rust analzyer plugin
  rust_analyzer = {},
  clangd = {},
  kotlin_language_server = {},
  jdtls = {},
  cssls = {},
  html = {},
}

for name, config in pairs(servers) do
  config.capabilities = capabilities
  lspconfig[name].setup(config)
end

