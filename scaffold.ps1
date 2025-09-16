# Requires PowerShell 5+
$ErrorActionPreference = "Stop"

function Ensure-Dir {
  param([string]$Path)
  if ([string]::IsNullOrWhiteSpace($Path)) { return }
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Ensure-File {
  param([string]$Path)
  $parent = Split-Path -Parent -Path $Path
  if ($parent) { Ensure-Dir $parent }
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType File -Path $Path -Force | Out-Null
  }
}

# Desired files
$files = @(
".env",
"apphosting.yaml",
"components.json",
"next.config.ts",
"package.json",
"README.md",
"tailwind.config.ts",
"tsconfig.json",
"src/app/globals.css",
"src/app/layout.tsx",
"src/app/page.tsx",
"src/app/login/page.tsx",
"src/app/admin/layout.tsx",
"src/app/admin/dashboard/page.tsx",
"src/app/admin/inventory-config/page.tsx",
"src/app/admin/inventory-config/page-data.ts",
"src/app/admin/inventory/page.tsx",
"src/app/admin/inventory-detail/page.tsx",
"src/app/admin/sales/page.tsx",
"src/app/admin/ai-ordering/page.tsx",
"src/app/admin/ai-ordering/actions.ts",
"src/app/admin/strategic-analysis/page.tsx",
"src/app/admin/strategic-analysis/actions.ts",
"src/app/seller/layout.tsx",
"src/app/seller/sales/page.tsx",
"src/ai/genkit.ts",
"src/ai/dev.ts",
"src/ai/flows/suggest-order-amounts.ts",
"src/ai/flows/strategic-analysis.ts",
"src/lib/utils.ts",
"src/lib/types.ts",
"src/hooks/use-store.ts",
"src/hooks/use-toast.ts",
"src/hooks/use-mobile.tsx",
"src/components/logo.tsx",
"src/components/language-switcher.tsx",
"src/components/ui/.gitkeep"
)

# Create all parent directories first (deduplicated)
$dirs = $files | ForEach-Object { Split-Path -Parent -Path $_ } | Where-Object { $_ -ne "" } | Sort-Object -Unique
foreach ($d in $dirs) { Ensure-Dir $d }

# Then create files
foreach ($f in $files) { Ensure-File $f }

Write-Host "✅ Structure créée. Vous pouvez maintenant coller vos fichiers dans les emplacements correspondants."
