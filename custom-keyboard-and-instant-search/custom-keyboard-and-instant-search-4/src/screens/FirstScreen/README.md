# Instant Search

## Tìm kiếm gần đây

1. Khi bấm vào Xóa tất cả ở Headline Tìm kiếm gần đây sẽ hiển thị Alert thông báo, bấm vào Xóa sẽ Xóa tất cả các kết quả tìm kiếm gần đây

2. Các Cell tìm kiếm gần đây khi bấm vào Xóa thì sẽ xóa lần lượt các Cell tìm kiếm tương ứng, khi xóa hết tất cả các Cell tìm kiếm gần đây thì ẩn toàn bộ View Tìm kiếm gần đây

## Instant Search

1. Khi vào màn tìm kiếm thì load kết quả là `<SearchDefault />`

2. Khi tìm kiếm trong quá trình query từ khóa nếu không có kết quả phù hợp sẽ hiển thị kết quả là `<SearchNoData />`. Lưu ý pass data query name vào phần description ở phần hiển thị kết quả `<SearchNoData />`

3. Khi tìm kiếm trong quá trình query từ khóa nếu có kết quả phù hợp sẽ hiển thị kết quả là `<SearchHaveData />`

**Lưu ý:** Mỗi section tìm kiếm tương ứng với mỗi lần query từ khóa sẽ hiển thị kết quả tương ứng với section đó, nếu trong section không có từ khóa nào liên quan thì không hiển thị section đó ở màn kết quả

## Swipeable Tab View

Đối với tính năng Swipe Tab View, Swipe Trái - Phải để chuyển Tab kết quả Search sẽ phát triển sau khi 2 phần trên hoàn thành. Lưu ý: Bỏ qua component `<SwipeableTabView />`
