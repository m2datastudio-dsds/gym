# Free Cloud Storage Comparison – Limits & When You Pay

## What “bandwidth” means

**Bandwidth** (or **egress**) = data **downloaded** from the cloud when someone opens a photo in your app.

- Each time a user (or the app) loads an image, the browser downloads that file from the provider’s server.
- That download size counts as “bandwidth” for that month.
- **Example:** 1 GB bandwidth/month = you can “serve” 1 GB of file downloads in that month.  
  If each photo is **200 KB**, then 1 GB ≈ **5,000 image views** in that month (or 5,000 photos viewed once).

So:
- **Storage** = how much total data you can **store** (number/size of photos).
- **Bandwidth** = how much total data can be **downloaded** (views of those photos) per month (or similar period).

---

## 1. Supabase Storage

| Item | Free tier |
|------|-----------|
| **Storage** | **1 GB** total file storage |
| **Bandwidth** | **10 GB/month** (e.g. 5 GB cached + 5 GB uncached) – all services (DB + storage + functions) share this |
| **Per-day image limit** | No fixed “X images per day” limit; you’re limited by the 1 GB storage and 10 GB/month bandwidth |
| **Max file size** | Depends on plan; typically tens of MB per file |

**Rough “how many photos”?**  
- If each photo ≈ 200 KB: 1 GB ≈ **~5,000 photos** stored.  
- 10 GB bandwidth ≈ **~50,000 views** of 200 KB images per month (or fewer if images are larger).

**When do you pay?**  
- Free plan: **no overage charges**. If you go over 1 GB storage, you get a notification and may need to free space or upgrade.  
- **Pro plan** (~$25/month): 100 GB storage, then **$0.021/GB/month** for extra storage.

**Other:** Free projects can be paused after 1 week of inactivity; limit of 2 active projects on free.

---

## 2. Firebase Storage

| Item | Free tier / no-cost usage |
|------|----------------------------|
| **Plan** | Storage is **no longer on a 100% free plan**. You must use the **Blaze (pay-as-you-go)** plan, but there are **no-cost usage limits** so you can stay at $0 if you stay within them. |
| **Storage** | **5 GB** free per month |
| **Download (egress)** | Free tier has limits (e.g. 10 GiB/month for App Hosting from 2025; exact numbers can vary by product). Beyond that, paid per GB. |
| **Per-day image limit** | No fixed “X images per day”; limited by 5 GB storage and monthly egress. |

**Rough “how many photos”?**  
- 5 GB ≈ **~25,000 photos** at 200 KB each (storage).  
- Viewing those photos uses “egress”; once you pass free egress, you pay (e.g. ~$0.12/GB in some regions).

**When do you pay?**  
- You **must have Blaze** to use Storage (card on file).  
- You **pay $0** as long as usage stays within the **no-cost limits** (5 GB storage + free egress).  
- Above that: pay for extra storage (e.g. ~$0.026/GB/month) and egress (per GB downloaded).

---

## 3. ImgBB

| Item | Free tier |
|------|-----------|
| **Storage** | No clearly published total “GB” limit; free API is intended for moderate use. |
| **Per image** | Max **32 MB** per image. |
| **Per-day limit** | **Not clearly published** in the API docs. In practice there are rate limits; exact “X images per day” is not stated (could be hundreds or low thousands; check their Terms or support if critical). |
| **Expiration** | Optional: images can auto-delete after 60–15,552,000 seconds. |

**When do you pay?**  
- Free API key: use within their (undocumented) limits.  
- If you hit rate limits, you may get errors until the next period; they may offer paid plans for higher limits.

**Good for:** Small or trial use. Not ideal if you need a guaranteed “X thousand images forever” with no surprises.

---

## 4. Backblaze B2

| Item | Free tier / usage |
|------|-------------------|
| **Storage** | **First 10 GB** of storage is **free**. After that: **$0.005/GB/month**. |
| **Upload** | **Free** (no charge to upload). |
| **Download (egress)** | **Free egress** = up to **3× your monthly average storage** per month.  
  - Example: 10 GB stored → **30 GB free egress/month**.  
  - Above that: **$0.01/GB** downloaded. |
| **Transactions** | **2,500 “Class B” (e.g. download) transactions free per day.** After that: $0.004 per 10,000. |

**What “3× storage” means:**  
- If you have **10 GB** stored on average in a month, you get **30 GB** of free downloads that month.  
- If you have **5 GB** stored, you get **15 GB** free egress.  
- So: **bandwidth (egress) free = 3 × (your stored size)** per month.

**Rough “how many photos”?**  
- 10 GB storage ≈ **~50,000 photos** at 200 KB.  
- 30 GB egress ≈ **~150,000 views** of 200 KB images per month.  
- **2,500 free downloads per day** = if each “view” is one download, that’s 2,500 image views per day free; more than that and you pay for extra transactions (and possibly egress if you exceed 3× storage).

**When do you pay?**  
- **Storage:** After **10 GB** → **$0.005/GB/month**.  
- **Egress:** After free (3× storage) → **$0.01/GB**.  
- **Transactions:** After 2,500 Class B/day → **$0.004 per 10,000** (and similar for other classes).

**Comparison vs others:**  
- **More free storage** (10 GB) than Supabase (1 GB).  
- **Free egress** tied to storage (3×) is generous for viewing your own photos.  
- **Per-day limit** = 2,500 free download transactions per day; good for small/medium gym; high traffic could hit this.

---

## Quick comparison table

| Service    | Free storage | Free bandwidth/egress     | Per-day limit        | When you pay |
|-----------|--------------|----------------------------|----------------------|--------------|
| **Supabase** | 1 GB       | 10 GB/month                | None (storage/bandwidth only) | Over 1 GB storage → upgrade; no overage $ on free. |
| **Firebase** | 5 GB       | Free tier within Blaze     | None (storage/egress) | Over 5 GB storage or free egress → pay. Blaze required. |
| **ImgBB**    | Not stated | Not stated                 | Not clearly stated   | When you hit (undocumented) rate limits. |
| **Backblaze B2** | 10 GB  | 3× storage/month (e.g. 30 GB for 10 GB) | 2,500 download transactions/day | Over 10 GB storage, over 3× egress, or over 2,500 downloads/day. |

---

## Summary for your gym app

- **Supabase:** ~**5,000 photos** (1 GB), ~**50,000 views/month** (10 GB). Good for small gym; after that you need to upgrade or clean old photos.
- **Firebase:** ~**25,000 photos** (5 GB); need Blaze but can stay at $0 within limits. Good if you’re okay adding a card.
- **ImgBB:** No clear “how many”; use for **small/trial**; not for guaranteed large, long-term storage.
- **Backblaze B2:** ~**50,000 photos** (10 GB), **2,500 image views per day** free, then paid. Best **free capacity** and clear rules; good for “after how many photos we must pay” (answer: after 10 GB stored, or after 2,500 views/day or 3× storage egress).

**“1 GB bandwidth/month”** = 1 GB of data **downloaded** (e.g. images viewed) in that month; it does **not** mean “1 GB of images stored.”
