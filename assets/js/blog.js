/* ===========================================================
   blog.js — client-side markdown blog for GitHub Pages
   - blog.html   : renders the list from posts/posts.json
   - post.html   : renders a single post from posts/<slug>.md
   Uses marked.js (loaded via CDN in the HTML).
   =========================================================== */

const POSTS_INDEX = 'posts/posts.json';

async function loadPostIndex() {
  const res = await fetch(POSTS_INDEX, { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load posts index');
  return res.json();
}

// ---------- Blog list page ----------
async function renderBlogList() {
  const wrap = document.getElementById('postList');
  if (!wrap) return;
  try {
    const posts = await loadPostIndex();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!posts.length) { wrap.innerHTML = '<p style="text-align:center;color:var(--text-muted)">No posts yet — check back soon.</p>'; return; }
    wrap.innerHTML = posts.map(p => `
      <a class="post-item reveal" href="post.html?post=${encodeURIComponent(p.slug)}">
        <div class="post-meta">${formatDate(p.date)} · ${p.tag || 'Note'}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.excerpt || '')}</p>
        <span class="read-more">Read more →</span>
      </a>`).join('');
    // re-observe the freshly injected reveal elements
    document.querySelectorAll('.post-item.reveal').forEach(el => el.classList.add('visible'));
  } catch (e) {
    wrap.innerHTML = `<p style="text-align:center;color:var(--text-muted)">Couldn't load posts. If you're viewing locally, run a local server (see README).</p>`;
    console.error(e);
  }
}

// ---------- Single post page ----------
async function renderSinglePost() {
  const article = document.getElementById('postContent');
  if (!article) return;
  const slug = new URLSearchParams(location.search).get('post');
  if (!slug) { article.innerHTML = '<p>Post not found.</p>'; return; }

  try {
    const posts = await loadPostIndex();
    const meta = posts.find(p => p.slug === slug);
    const res = await fetch(`posts/${slug}.md`, { cache: 'no-store' });
    if (!res.ok) throw new Error('missing markdown');
    const md = await res.text();

    document.title = (meta ? meta.title : slug) + ' · Blog';
    const header = meta
      ? `<div class="post-meta">${formatDate(meta.date)} · ${meta.tag || 'Note'}</div>`
      : '';
    article.innerHTML = header + marked.parse(md);
  } catch (e) {
    article.innerHTML = '<p>Sorry, this post could not be loaded.</p>';
    console.error(e);
  }
}

// ---------- helpers ----------
function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogList();
  renderSinglePost();
});
