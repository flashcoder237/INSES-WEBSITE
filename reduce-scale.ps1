# Script pour réduire le scale du site de 20%

$files = Get-ChildItem -Path '.\app', '.\components' -Filter '*.tsx' -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = Get-Content $file -Raw

    # Réduire les tailles de police de ~20%
    $content = $content -replace 'text-8xl', 'text-6xl'
    $content = $content -replace 'text-7xl', 'text-6xl'
    $content = $content -replace 'text-6xl', 'text-5xl'
    $content = $content -replace 'text-5xl', 'text-4xl'
    $content = $content -replace 'text-4xl', 'text-3xl'
    $content = $content -replace 'text-3xl', 'text-2xl'
    $content = $content -replace 'text-2xl', 'text-xl'
    $content = $content -replace 'text-xl(?!g)', 'text-lg'

    # Réduire padding et margin
    $content = $content -replace 'py-24', 'py-20'
    $content = $content -replace 'py-20', 'py-16'
    $content = $content -replace 'px-12', 'px-10'
    $content = $content -replace 'px-10', 'px-8'
    $content = $content -replace 'p-12', 'p-10'
    $content = $content -replace 'p-10', 'p-8'

    Set-Content $file -Value $content -NoNewline
}

Write-Host "Tailles de police et espacements réduits dans $($files.Count) fichiers"
