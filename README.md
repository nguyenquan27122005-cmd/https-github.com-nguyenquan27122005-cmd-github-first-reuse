# GitHub-First Reuse 2.0

Skill giúp AI tìm và đánh giá code có thể tái sử dụng trước khi xây dựng một tính năng lớn. Ưu tiên code trong dự án, thư viện chuẩn và dependency đang dùng; chỉ tìm GitHub khi còn thiếu khả năng cần thiết.

## Dùng như thế nào

Chỉ có một bản chính: [.agents/skills/github-first-reuse/SKILL.md](.agents/skills/github-first-reuse/SKILL.md).

Sao chép **toàn bộ** thư mục `.agents/skills/github-first-reuse/` vào thư mục skill mà công cụ của bạn hỗ trợ. Giữ nguyên `checklists/`, `references/` và `examples/` bên trong. Nếu công cụ hỗ trợ skill ở `.agents/skills/` của dự án, đặt thư mục này trong dự án cần làm việc. Với môi trường khác, dùng vị trí skill được công cụ đó quy định.

Ví dụ giao việc:

> Dùng github-first-reuse để thêm tính năng đọc hóa đơn PDF vào dự án này. Ưu tiên giải pháp đang có, kiểm tra các thư viện phù hợp, rồi triển khai và kiểm tra phần tích hợp.

Nếu cần so sánh rộng hơn, yêu cầu **Deep** và nêu mục tiêu, runtime, ràng buộc hoặc repo muốn đánh giá. Tìm kiếm và chạy thử cần công cụ tương ứng; khi thiếu công cụ, skill yêu cầu ghi rõ phần chưa xác minh.

## Ba mức làm việc

| Mức | Phù hợp | Ngân sách mặc định |
|---|---|---|
| Fast | Sửa nhỏ hoặc code có sẵn đã giải quyết được | Không tìm repo ngoài |
| Standard | Một tính năng/thành phần mới | Tối đa 3 truy vấn, đọc sâu 2 ứng viên |
| Deep | Nền tảng dự án hoặc quyết định tích hợp lớn | Tối đa 6 truy vấn, đọc sâu 3 ứng viên |

Một điểm còn thiếu có thể làm thay đổi quyết định cho phép thêm **một** vòng giới hạn. Đây là trần công việc, không phải số lượng phải tìm đủ. Kết quả là giải pháp chạy được và bằng chứng kiểm tra; tự viết vẫn là lựa chọn hợp lệ.

## Nâng cấp từ bản cũ

Đường dẫn `skills/github-first-reuse/` đã được thay bằng `.agents/skills/github-first-reuse/` để tránh hai bản lệch nhau. Thay bản đã cài bằng toàn bộ thư mục mới và khởi động lại phiên nếu công cụ chỉ nạp skill khi bắt đầu. Tên skill vẫn là `github-first-reuse`; bản đã cài trước đó không tự cập nhật chỉ vì repo đổi.

## Kiểm tra gói

Chạy từ thư mục gốc với Node.js 22 trở lên, không cần dependency ngoài:

```text
node --test tests/packaging.test.mjs
```

Các kiểm tra phát hiện entrypoint trùng, file tham chiếu bị thiếu, đường dẫn thoát khỏi gói và tài liệu hỗ trợ không thể tìm từ `SKILL.md`. Chúng kiểm tra cấu trúc đóng gói; đánh giá hành vi cần các tác vụ thực tế.
