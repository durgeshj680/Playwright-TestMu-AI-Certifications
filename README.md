# Playwright 102 – TestMu AI Assignment

## Quick Start (VS Code)

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run the debug helper FIRST (fixes selector issues)
```bash
npx playwright test debug-selectors --headed --project=chromium
```
Read the printed IDs in the terminal. If any ID differs from what's
in the spec files, update that spec file accordingly (takes 30 sec).

### 3. Run all 3 scenarios locally
```bash
npx playwright test --headed --project=chromium
```

### 4. View the HTML report
```bash
npx playwright show-report
```

---

## Common Failure Fixes

| Error | Fix |
|---|---|
| `locator('#user-message') not found` | Replace `#user-message` with printed ID from debug run |
| `locator('#name') not found` | Replace `#name` with printed ID |
| Slider value not 95 | The JS dispatch approach works; check `#rangeSuccess` ID from debug |
| Country dropdown fails | Use `{ value: 'US' }` instead of `{ label: 'United States' }` |
| Validation message empty | Use `nameField.getAttribute('required')` then submit check |

---

## Project Structure

```
playwright-102/
├── tests/
│   ├── scenario1-simple-form.spec.js   ← Scenario 1
│   ├── scenario2-slider.spec.js        ← Scenario 2
│   ├── scenario3-input-form.spec.js    ← Scenario 3
│   └── debug-selectors.spec.js         ← Run first, delete before submit
├── playwright.config.js
├── hyperexecute.yaml                   ← Cloud execution config
├── .github/workflows/hyperexecute.yml  ← GitHub Actions (optional)
└── package.json
```

---

## Run on HyperExecute Cloud (after local tests pass)

### Step 1 – Add secrets in HyperExecute dashboard
Go to HyperExecute Dashboard → Secrets → add:
- `LT_USERNAME` = your username
- `LT_ACCESS_KEY` = your access key

### Step 2 – Download CLI & trigger
```bash
# Linux / macOS
curl -O https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
chmod +x hyperexecute
./hyperexecute --user YOUR_USERNAME --key YOUR_KEY --config hyperexecute.yaml

# Windows
Invoke-WebRequest -Uri "https://downloads.lambdatest.com/hyperexecute/win/hyperexecute.exe" -OutFile "hyperexecute.exe"
.\hyperexecute.exe --user YOUR_USERNAME --key YOUR_KEY --config hyperexecute.yaml
```

### Step 3 – Download artifacts
HyperExecute dashboard → your job → Artifacts → Download ZIP

---

## Submission Checklist
- [ ] `npx playwright test` passes all 3 scenarios locally
- [ ] Tests pass on HyperExecute (Windows 10 Chrome + Linux Chrome)
- [ ] Repo is **private**, shared with `admin@testmuaicertifications.com`
- [ ] GitHub URL + Session IDs submitted on exam portal
