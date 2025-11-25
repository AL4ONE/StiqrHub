# Script untuk push semua branch ke GitLab BE dan FE
# Backend: push ke branch yang sama
# Frontend: push ke branch on-development

$branches = @(
    'apply-banner12',
    'backup-pre-reset-main-2025-11-06',
    'backup-pre-revert-09465bc',
    'banner12-plus-fix',
    'deployment',
    'fix-from-banner13',
    'main',
    'master',
    'on-deploy',
    'on-deployment',
    'on-development',
    'on-development-new',
    'restore-at-fix-tenant-detail',
    'restore-banner',
    'update-logo'
)

$currentBranch = git branch --show-current

foreach ($branch in $branches) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Processing branch: $branch" -ForegroundColor Yellow
    
    # Checkout branch
    git checkout $branch 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Skip: Branch $branch not found" -ForegroundColor Red
        continue
    }
    
    # Push Backend
    Write-Host "  Pushing Backend to gitlab-be/$branch..." -ForegroundColor Green
    $beSplit = "be-split-$branch"
    git subtree split --prefix=backend -b $beSplit 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        git push gitlab-be "${beSplit}:${branch}" --force-with-lease 2>&1 | Out-Null
        git branch -D $beSplit 2>&1 | Out-Null
        Write-Host "    Backend: OK" -ForegroundColor Green
    } else {
        Write-Host "    Backend: Failed" -ForegroundColor Red
    }
    
    # Push Frontend (always to on-development)
    Write-Host "  Pushing Frontend to gitlab-fe/on-development..." -ForegroundColor Green
    $feSplit = "fe-split-$branch"
    git subtree split --prefix=frontend -b $feSplit 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        git push gitlab-fe "${feSplit}:on-development" --force-with-lease 2>&1 | Out-Null
        git branch -D $feSplit 2>&1 | Out-Null
        Write-Host "    Frontend: OK" -ForegroundColor Green
    } else {
        Write-Host "    Frontend: Failed" -ForegroundColor Red
    }
    
    Write-Host "  Done: $branch" -ForegroundColor Cyan
}

# Return to original branch
Write-Host "`nReturning to branch: $currentBranch" -ForegroundColor Yellow
git checkout $currentBranch 2>&1 | Out-Null

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "All branches processed!" -ForegroundColor Green

