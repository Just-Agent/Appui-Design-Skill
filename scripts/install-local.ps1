param(
  [string]$DestinationRoot = "$env:USERPROFILE\.codex\skills",
  [string]$SkillName = "appui-design-skill"
)

$ErrorActionPreference = "Stop"

$source = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$destinationRootResolved = if (Test-Path -LiteralPath $DestinationRoot) {
  (Resolve-Path -LiteralPath $DestinationRoot).Path
} else {
  New-Item -ItemType Directory -Path $DestinationRoot | Out-Null
  (Resolve-Path -LiteralPath $DestinationRoot).Path
}

$target = Join-Path $destinationRootResolved $SkillName
$targetParent = Split-Path -Parent $target
$resolvedTargetParent = (Resolve-Path -LiteralPath $targetParent).Path

if ($resolvedTargetParent -ne $destinationRootResolved) {
  throw "Refusing to install outside destination root: $target"
}

if (Test-Path -LiteralPath $target) {
  Remove-Item -LiteralPath $target -Recurse -Force
}

$exclude = @(".git", "node_modules", "tmp", ".DS_Store", "Thumbs.db")
New-Item -ItemType Directory -Path $target | Out-Null

Get-ChildItem -LiteralPath $source -Force | Where-Object {
  $exclude -notcontains $_.Name
} | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $target -Recurse -Force
}

Write-Host "Installed $SkillName to $target"
