# Backblaze B2 – Your Questions Answered

## Is B2 a good choice for the gym app?

**Yes.** For your case (free, clear limits, more storage than Supabase/Firebase free tier), B2 is a solid choice:

- **10 GB free storage** (vs 1 GB Supabase, 5 GB Firebase) → more member/staff photos before any cost.
- **Clear rules:** Free egress = 3× storage; 2,500 free download transactions/day; no hidden fees.
- **S3-compatible API** → your app can be adapted from S3 to B2 without a full rewrite (similar upload/URL flow).
- **No compulsory monthly fee** → you pay only when you go over the free limits.

---

## Do I need to pay if I use within the limit? Is there a compulsory monthly amount?

**You do NOT pay if you stay within the free limits. There is NO compulsory monthly fee.**

- **Pay only for what you use.** No monthly subscription.
- **Within free tier:**  
  - Storage ≤ 10 GB  
  - Download (egress) ≤ 3× your average storage per month  
  - ≤ 2,500 download transactions per day  
  → **$0.00**
- You only pay when you **exceed** those (e.g. storage over 10 GB at $0.005/GB/month, or egress over 3× storage at $0.01/GB).
- You can add a payment method for overage; if you never exceed the free tier, your bill stays **$0**.

---

## If I don’t use the account for some days, will it become inactive?

**Backblaze B2 does not suspend accounts for inactivity.**  
Their policy described in the docs is about **non-payment**, not “no activity.” So:

- If you stay within the free tier and owe **$0**, the account remains active even if you don’t upload or download for days, weeks, or months.
- Your data stays stored; the account does not “expire” or go inactive just because you didn’t use it.
- If in doubt, you can confirm in the official docs or by asking Backblaze support.

---

## Can I stop the service in the future if I don’t need it?

**Yes.** You can stop using B2 anytime:

1. **Disable B2 (keep Backblaze account):**  
   Delete all files and buckets, delete application keys, then in **My Settings** uncheck **B2 Cloud Storage**. B2 is then disabled; you can re-enable later if needed.

2. **Delete the whole Backblaze account:**  
   After disabling B2 (and any other products), go to **My Settings** → **Delete Account** and follow the steps. Your data will be removed.

You are not locked into a contract; you can leave whenever you want.

---

## Official Backblaze B2 links (to check manually)

| What | Link |
|------|------|
| **Pricing (main)** | https://www.backblaze.com/cloud-storage/pricing |
| **B2 Pricing (help article)** | https://help.backblaze.com/hc/en-us/articles/360037814594-B2-Pricing |
| **B2 Usage and Billing** | https://help.backblaze.com/hc/en-us/sections/203997458-B2-Usage-and-Billing |
| **Transaction pricing (API calls)** | https://backblaze.com/cloud-storage/transaction-pricing |
| **B2 Cloud Storage documentation** | https://www.backblaze.com/docs/cloud-storage-overview (overview); full docs: https://backblaze.com/docs |
| **Cancel / disable B2** | https://backblaze.com/docs/cloud-storage-delete-or-cancel-a-backblaze-b2-account |
| **Account management** | https://www.backblaze.com/docs/cloud-storage-account-management |

Use these to double-check pricing, limits, and cancellation steps yourself.
