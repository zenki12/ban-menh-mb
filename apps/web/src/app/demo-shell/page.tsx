import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";

export default function DemoShellPage() {
  return (
    <PageShell
      title="Demo PageShell"
      subtitle="Khung trang chuẩn cho mọi module"
      actions={<Button variant="primary">Bắt đầu</Button>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Card as="article" padding="lg" variant="default">
          <h3>Module page</h3>
          <p className="mt-4">
            Dùng PageShell để giữ vị trí Dashboard, tiêu đề và khoảng cách nhất quán.
          </p>
        </Card>
        <Card as="article" padding="lg" variant="glass">
          <h3>Result page</h3>
          <p className="mt-4">
            Container có thể đổi sang narrow/default/wide tùy loại nội dung.
          </p>
        </Card>
        <Card as="article" padding="lg" variant="panel">
          <h3>Action area</h3>
          <p className="mt-4">
            Slot actions nằm bên phải header và tự xuống dòng trên mobile.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
