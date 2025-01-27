USE miyo_time;

-- 创建记录表
CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 唯一标识记录的ID
  record_name VARCHAR(255) NOT NULL,
  -- 记录名称
  start_time DATETIME NOT NULL,
  -- 开始时间
  end_time DATETIME NOT NULL,
  -- 结束时间
  category VARCHAR(100) NOT NULL,
  -- 记录分类
  task_id INT DEFAULT NULL,
  -- 可选的关联任务ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 记录创建时间
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- 记录更新时间
  INDEX idx_task_id (task_id) -- 为任务ID创建索引
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;