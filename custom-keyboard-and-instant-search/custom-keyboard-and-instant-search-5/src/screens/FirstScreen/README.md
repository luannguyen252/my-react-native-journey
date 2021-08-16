# Instant Search

## Tìm kiếm gần đây

1. Khi bấm vào Xóa tất cả ở Headline Tìm kiếm gần đây sẽ hiển thị Alert thông báo, bấm vào Xóa sẽ Xóa tất cả các kết quả tìm kiếm gần đây.

2. Các Cell tìm kiếm gần đây khi bấm vào Xóa thì sẽ xóa lần lượt các Cell tìm kiếm tương ứng, khi xóa hết tất cả các Cell tìm kiếm gần đây thì ẩn toàn bộ View Tìm kiếm gần đây.

## Instant Search

1. Khi vào màn tìm kiếm thì load kết quả là `<SearchDefault />`.

2. Khi tìm kiếm trong quá trình query từ khóa nếu không có kết quả phù hợp sẽ hiển thị kết quả là `<SearchNoData />`. Lưu ý pass data query name vào phần description ở phần hiển thị kết quả `<SearchNoData />`.

3. Khi tìm kiếm trong quá trình query từ khóa nếu có kết quả phù hợp sẽ hiển thị kết quả là `<SearchHaveData />`.

**Lưu ý:** Mỗi section tìm kiếm tương ứng với mỗi lần query từ khóa sẽ hiển thị kết quả tương ứng với section đó, nếu trong section không có từ khóa nào liên quan thì không hiển thị section đó ở màn kết quả.

## Swipeable Tab View

Đối với tính năng Swipe Tab View, Swipe Trái - Phải để có thể chuyển giữa các Tab tương tứng với các Section từ kết quả tìm kiếm.

Có thể sử dụng thư viện `react-native-scrollable-tab-view` hoặc bất kỳ thư viện nào khác hoặc tự code đều được.

`data/tabItems.json`: là file chưa các thông tin về Tab tìm kiếm sẽ hiển thị khi có kết quả tìm kiếm, nếu có kết quả tìm kiếm liên quan đến Tab tìm kiếm thì mới hiển thị, kèm theo số lượng `amount` kết quả tìm kiếm ở Tab đó.

`components/TabItemView.js`: là file style về Tab component, bao gồm style `isActive` thay đổi borderBottom và color

`components/SwipeableTabView.js`: là file về Tab có thể Scroll trái phải để xem thêm các Tab section kết quả tìm kiếm

**Bổ sung:** Đối với phần `results/SearchHaveData` khi có kết quả tìm kiếm thì hiển thị Tab bên dưới Input Search, có thể Swipe Left-Right để chuyển nhanh các Tab thay vì phải bấm vào phần Tab bên dưới Input Search.

**Nâng cao:** (Sẽ làm sau) width của Tab sẽ thay đổi theo số lượng kết quả tìm kiếm, luôn luôn có Tab Tất cả, nhưng nếu chỉ có 1 Tab như Dịch vụ thì sẽ chia Dimension / 2.
