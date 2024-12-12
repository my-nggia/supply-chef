1. Repair Report (Báo cáo sửa chữa)
Actor: Warehouse Manager
Mô tả: Warehouse Manager có thể lập báo cáo khi cần sửa chữa thiết bị hoặc cơ sở hạ tầng trong kho. Use case này có một hành động phụ là "Choose Agent" (Chọn đại lý) để chỉ định ai sẽ thực hiện việc sửa chữa.

2. Purchasing Materials (Mua nguyên vật liệu)
Actor: Warehouse Manager
Mô tả: Warehouse Manager thực hiện quy trình mua thêm nguyên vật liệu khi cần thiết. Use case này bao gồm các hành động con:
"Choose Materials" (Chọn nguyên vật liệu): Chọn loại nguyên vật liệu cần mua.
"Enter Quantity" (Nhập số lượng): Nhập số lượng nguyên vật liệu cần mua.

3. View Forecast (Xem dự báo)
Actor: Warehouse Manager
Mô tả: Warehouse Manager có thể xem dự báo để nắm rõ nhu cầu hàng hóa trong tương lai và lập kế hoạch quản lý kho phù hợp.

4. Inventory Audit (Kiểm kê hàng hóa)
Actor: Warehouse Manager
Mô tả: Warehouse Manager tiến hành kiểm kê hàng hóa trong kho để đảm bảo dữ liệu khớp với thực tế và tránh thất thoát.

5. Tracking Shipping (Theo dõi vận chuyển)
Actor: Warehouse Manager
Mô tả: Warehouse Manager theo dõi trạng thái các lô hàng vận chuyển, bao gồm cả hàng nhập kho và xuất kho.

6. Receive Materials (Nhận nguyên vật liệu)
Actor: Warehouse Staff
Mô tả: Warehouse Staff nhận nguyên vật liệu từ nhà cung cấp hoặc từ bộ phận khác. Use case này bao gồm:
"Scan QR Code" (Quét mã QR): Quét mã QR của hàng hóa để cập nhật thông tin vào hệ thống.
"Quality Control" (Kiểm tra chất lượng): Kiểm tra chất lượng nguyên vật liệu trước khi nhập kho.

7. Order Fulfillment (Hoàn thành đơn hàng)
Actor: Warehouse Staff
Mô tả: Warehouse Staff xử lý và hoàn thành các đơn hàng xuất kho. Các bước bao gồm:
"Receive Request" (Nhận yêu cầu): Nhận yêu cầu xuất hàng từ hệ thống.
"Scan QR" (Quét mã QR): Quét mã hàng hóa để xác nhận xuất kho.