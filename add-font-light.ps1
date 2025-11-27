# Script pour ajouter font-light aux descriptions et paragraphes

$files = Get-ChildItem -Path '.\app', '.\components' -Filter '*.tsx' -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file)

    # Ajouter font-light aux paragraphes de description (text-lg ou text-base avec text-[#8D9AAE] ou text-gray)
    $content = $content -replace '(className="[^"]*text-lg[^"]*text-\[#8D9AAE\][^"]*)"', '$1 font-light"'
    $content = $content -replace '(className="[^"]*text-\[#8D9AAE\][^"]*text-lg[^"]*)"', '$1 font-light"'
    $content = $content -replace '(className="[^"]*text-gray-[^"]*text-lg[^"]*)"', '$1 font-light"'
    $content = $content -replace '(className="[^"]*text-lg[^"]*text-gray-[^"]*)"', '$1 font-light"'

    # Ajouter font-light aux sous-titres et descriptions
    $content = $content -replace '(className="[^"]*text-lg md:text-lg text-\[#EDF2F4\][^"]*leading-relaxed)', '$1 font-light'
    $content = $content -replace '(className="[^"]*text-lg text-\[#8D9AAE\][^"]*)"', '$1 font-light"'
    $content = $content -replace '(className="[^"]*text-lg text-gray-200[^"]*)"', '$1 font-light"'

    [System.IO.File]::WriteAllText($file, $content)
}

Write-Host "Font-light ajouté dans $($files.Count) fichiers"
