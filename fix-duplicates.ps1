# Script pour corriger les doublons de classes

$files = Get-ChildItem -Path '.\app', '.\components' -Filter '*.tsx' -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file)

    # Supprimer les doublons de font-light
    $content = $content -replace 'font-light font-light', 'font-light'
    $content = $content -replace 'font-light font-light', 'font-light'

    # Supprimer les doublons de text-lg
    $content = $content -replace 'text-lg text-lg', 'text-lg'

    [System.IO.File]::WriteAllText($file, $content)
}

Write-Host "Doublons corrigés dans $($files.Count) fichiers"
