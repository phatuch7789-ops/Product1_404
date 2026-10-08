import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string }>;
};

export default async function DeleteProductPage({
  params,
  searchParams,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const [{ id }, search] = await Promise.all([params, searchParams]);
  const productId = Number(id);
  if (!Number.isSafeInteger(productId) || productId < 1) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, productId);

  return (
    <main className="product-page management-page">
      <header className="page-header">
        <h1>ยืนยันการลบสินค้า</h1>
      </header>

      <section className="management-card">
        <p>
          สินค้า <strong>{search.title ?? `รหัส ${id}`}</strong>
        </p>
        <p>
          กดปุ่มเพื่อกลับหน้าหลัก โดยรายการสินค้าจะยังอยู่เหมือนเดิม
        </p>
        <form action={deleteAction}>
          <div className="form-actions">
            <button className="danger-button" type="submit">
              ยืนยันการลบ
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
