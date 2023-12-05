runas /user:Administrator "powershell start powershell.exe -wo $(Get-Location) -Args $(Join-Path (Get-Location) scripts\cn_build.ps1)"
