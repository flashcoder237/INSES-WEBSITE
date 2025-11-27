# Script pour augmenter le scale de 10% et améliorer les espacements

$files = Get-ChildItem -Path '.\app', '.\components' -Filter '*.tsx' -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file)

    # Augmenter les tailles de police de ~10%
    # Titres principaux
    $content = $content -replace 'text-lg md:text-lg lg:text-lg font-bold', 'text-4xl md:text-5xl lg:text-6xl font-bold'
    $content = $content -replace 'text-lg md:text-lg font-bold', 'text-3xl md:text-4xl font-bold'
    $content = $content -replace '([^\-])text-lg font-bold', '$1text-2xl font-bold'

    # Sous-titres et textes moyens
    $content = $content -replace 'text-lg md:text-lg text-\[#EDF2F4\]', 'text-xl md:text-2xl text-[#EDF2F4]'
    $content = $content -replace 'text-lg md:text-lg text-gray-200', 'text-xl md:text-2xl text-gray-200'
    $content = $content -replace 'text-lg text-\[#8D9AAE\]', 'text-lg text-[#8D9AAE]'
    $content = $content -replace 'text-lg text-gray-200', 'text-xl text-gray-200'

    # Stats et chiffres
    $content = $content -replace 'text-lg md:text-lg font-bold bg-gradient', 'text-5xl md:text-6xl font-bold bg-gradient'

    # Augmenter les espacements principaux
    $content = $content -replace 'py-16(["\s])', 'py-20$1'
    $content = $content -replace 'py-20(["\s])', 'py-24$1'
    $content = $content -replace 'px-4(["\s])', 'px-6$1'
    $content = $content -replace 'p-8(["\s])', 'p-10$1'
    $content = $content -replace 'p-10(["\s])', 'p-12$1'

    # Augmenter les gaps
    $content = $content -replace 'gap-4(["\s])', 'gap-6$1'
    $content = $content -replace 'gap-6(["\s])', 'gap-8$1'
    $content = $content -replace 'gap-8(["\s])', 'gap-10$1'

    # Augmenter les marges
    $content = $content -replace 'mb-6(["\s])', 'mb-8$1'
    $content = $content -replace 'mb-8(["\s])', 'mb-10$1'
    $content = $content -replace 'mb-12(["\s])', 'mb-16$1'
    $content = $content -replace 'mb-16(["\s])', 'mb-20$1'
    $content = $content -replace 'mt-16(["\s])', 'mt-20$1'
    $content = $content -replace 'mt-20(["\s])', 'mt-24$1'

    # Améliorer les cards
    $content = $content -replace 'rounded-2xl', 'rounded-3xl'
    $content = $content -replace 'shadow-lg', 'shadow-xl'
    $content = $content -replace 'shadow-xl', 'shadow-2xl'

    [System.IO.File]::WriteAllText($file, $content)
}

Write-Host "Scale augmenté et espacements améliorés dans $($files.Count) fichiers"
