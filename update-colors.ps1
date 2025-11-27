# Script PowerShell pour mettre à jour les couleurs INSES dans tous les fichiers

$files = Get-ChildItem -Path . -Recurse -Include *.tsx,*.ts -Exclude node_modules,".next" | Where-Object { $_.FullName -notmatch '\\node_modules\\|\\\.next\\' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Remplacer les couleurs bleues par les nouvelles couleurs INSES
    $content = $content -replace 'blue-900', '[#2B2E42]'
    $content = $content -replace 'blue-800', '[#2B2E42]'
    $content = $content -replace 'blue-700', '[#2B2E42]'
    $content = $content -replace 'blue-600', '[#D80536]'
    $content = $content -replace 'blue-500', '[#D80536]'
    $content = $content -replace 'blue-400', '[#EE2449]'
    $content = $content -replace 'blue-200', '[#EDF2F4]'
    $content = $content -replace 'blue-100', '[#EDF2F4]'
    $content = $content -replace 'blue-50', '[#EDF2F4]'

    # Remplacer red par les couleurs INSES
    $content = $content -replace 'red-900', '[#2B2E42]'
    $content = $content -replace 'red-800', '[#2B2E42]'
    $content = $content -replace 'red-700', '[#D80536]'
    $content = $content -replace 'red-600', '[#D80536]'
    $content = $content -replace 'red-500', '[#D80536]'
    $content = $content -replace 'red-400', '[#EE2449]'
    $content = $content -replace 'red-200', '[#EDF2F4]'
    $content = $content -replace 'red-100', '[#EDF2F4]'
    $content = $content -replace 'red-50', '[#EDF2F4]'

    # Remplacer indigo
    $content = $content -replace 'indigo-900', '[#2B2E42]'
    $content = $content -replace 'indigo-800', '[#2B2E42]'
    $content = $content -replace 'indigo-600', '[#D80536]'
    $content = $content -replace 'indigo-400', '[#EE2449]'

    # Remplacer gray-900 et gray-800 par navy
    $content = $content -replace 'gray-900(?!\])', '[#2B2E42]'
    $content = $content -replace 'gray-800', '[#2B2E42]'
    $content = $content -replace 'gray-700', '[#8D9AAE]'
    $content = $content -replace 'gray-600', '[#8D9AAE]'
    $content = $content -replace 'gray-500', '[#8D9AAE]'

    Set-Content $file.FullName -Value $content
}

Write-Host "Mise à jour terminée pour $($files.Count) fichiers"
