class Solution(object):
    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        # 定义两个标识i,j i从头开始遍历 j从i+1的位置开始遍历
        list = []
        nums.sort()
        print(nums)
        for i in range(0,len(nums)-1):
            if nums[i-1] and nums[i] == nums[i-1]:
                continue
            for j in range(i+1,len(nums)):
                if nums[j-1] and nums[j] == nums[j-1] and nums[j]!=nums[i]:
                    continue
                # 定义第三个标识m 作为遍历的数组
                for m in range(j + 1, len(nums)):
                    if nums[i] + nums[j] + nums[m] == 0:
                        list.append([nums[i],nums[j],nums[m]])

        print(list)


if __name__ == "__main__":
    nums = [-1, 0, 1, 2, -1, -4]
    s = Solution()
    s.threeSum(nums)
