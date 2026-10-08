import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    title?: string;
    price?: string;
    stock?: string;
    category?: string;
  }>;
};

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const [{ id }, search] = await Promise.all([params, searchParams]);
  const productId = Number(id);
  if (!Number.isSafeInteger(productId) || productId < 1) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, productId);

  return (
    <main className="product-page management-page">
      <header className="page-header">
        <h1>แก้ไขสินค้า</h1>
      </header>

      <form action={updateAction} className="product-form">
        <div className="product-fields management-fields">
          <div className="form-field">
            <label htmlFor="title">ชื่อสินค้า</label>
            <input id="title" name="title" defaultValue={search.title ?? ""} required />
          </div>
          <div className="form-field">
            <label htmlFor="price">ราคา</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={search.price ?? ""}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="stock">จำนวนคงเหลือ</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              defaultValue={search.stock ?? ""}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="category">หมวดหมู่</label>
            <input
              id="category"
              name="category"
              defaultValue={search.category ?? ""}
              required
            />
          </div>
        </div>

        <p className="management-id">รหัสสินค้า: {productId}</p>
        <div className="form-actions">
          <button type="submit">บันทึก</button>
          <Link className="management-link" href="/">
            กลับหน้ารายการ
          </Link>
        </div>
      </form>
    </main>
  );
}
