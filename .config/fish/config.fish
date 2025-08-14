if status is-interactive
    echo 
    fastfetch
end

# uv
fish_add_path "/home/levi/.local/bin"
alias cd z
zoxide init fish | source
