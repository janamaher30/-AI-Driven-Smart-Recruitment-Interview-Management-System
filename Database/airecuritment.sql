-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2026 at 04:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airecuritment`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `job_requisition_id` bigint(20) UNSIGNED NOT NULL,
  `cv_path` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `job_requisition_id`, `cv_path`, `status`, `created_at`, `updated_at`) VALUES
(7, 1, 1, 'cvs/viLU3hvomyxdozMXbi5ezBjPpg9t2kMJ0DOSM9nX.pdf', 'Pending', '2026-05-02 22:36:41', '2026-05-02 22:36:41');

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `assessmentId` varchar(36) NOT NULL,
  `candidateId` varchar(36) NOT NULL,
  `jobId` varchar(36) NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 60,
  `score` double(8,2) DEFAULT NULL,
  `status` enum('ACTIVE','COMPLETED','FLAGGED') NOT NULL DEFAULT 'ACTIVE',
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `proctorFlags` int(11) NOT NULL DEFAULT 0,
  `difficultyLevel` varchar(20) NOT NULL DEFAULT 'Medium',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_sessions`
--

CREATE TABLE `assessment_sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL,
  `total_score` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'in_progress',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessment_sessions`
--

INSERT INTO `assessment_sessions` (`id`, `user_id`, `started_at`, `expires_at`, `total_score`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-05-02 23:06:31', '2026-05-02 23:36:31', 0, 'in_progress', '2026-05-02 23:06:31', '2026-05-02 23:06:31'),
(2, 1, '2026-05-02 23:08:35', '2026-05-02 23:38:35', 0, 'in_progress', '2026-05-02 23:08:35', '2026-05-02 23:08:35'),
(3, 1, '2026-05-02 23:14:24', '2026-05-02 23:44:24', 0, 'in_progress', '2026-05-02 23:14:24', '2026-05-02 23:14:24'),
(4, 1, '2026-05-02 23:14:28', '2026-05-02 23:44:28', 0, 'in_progress', '2026-05-02 23:14:28', '2026-05-02 23:14:28'),
(5, 1, '2026-05-02 23:14:36', '2026-05-02 23:44:36', 0, 'in_progress', '2026-05-02 23:14:36', '2026-05-02 23:14:36'),
(6, 1, '2026-05-02 23:16:18', '2026-05-02 23:46:18', 0, 'in_progress', '2026-05-02 23:16:18', '2026-05-02 23:16:18'),
(7, 1, '2026-05-02 23:16:30', '2026-05-02 23:46:30', 0, 'in_progress', '2026-05-02 23:16:30', '2026-05-02 23:16:30'),
(8, 1, '2026-05-02 23:19:42', '2026-05-02 23:49:42', 0, 'in_progress', '2026-05-02 23:19:42', '2026-05-02 23:19:42'),
(9, 1, '2026-05-02 23:23:04', '2026-05-02 23:53:04', 0, 'in_progress', '2026-05-02 23:23:04', '2026-05-02 23:23:04'),
(10, 1, '2026-05-02 23:29:17', '2026-05-02 23:59:17', 0, 'in_progress', '2026-05-02 23:29:17', '2026-05-02 23:29:17'),
(11, 1, '2026-05-02 23:31:03', '2026-05-03 00:01:03', 0, 'in_progress', '2026-05-02 23:31:03', '2026-05-02 23:31:03'),
(12, 1, '2026-05-02 23:33:50', '2026-05-03 00:03:50', 0, 'in_progress', '2026-05-02 23:33:50', '2026-05-02 23:33:50'),
(13, 1, '2026-05-02 23:38:15', '2026-05-03 00:08:15', 0, 'in_progress', '2026-05-02 23:38:15', '2026-05-02 23:38:15'),
(14, 1, '2026-05-02 23:40:49', '2026-05-03 00:10:49', 0, 'in_progress', '2026-05-02 23:40:49', '2026-05-02 23:40:49'),
(15, 1, '2026-05-02 23:40:54', '2026-05-03 00:10:54', 0, 'in_progress', '2026-05-02 23:40:54', '2026-05-02 23:40:54'),
(16, 1, '2026-05-02 23:44:28', '2026-05-03 00:14:28', 0, 'in_progress', '2026-05-02 23:44:28', '2026-05-02 23:44:28'),
(17, 1, '2026-05-02 23:46:04', '2026-05-03 00:16:04', 0, 'in_progress', '2026-05-02 23:46:04', '2026-05-02 23:46:04'),
(18, 1, '2026-05-02 23:46:09', '2026-05-03 00:16:09', 0, 'in_progress', '2026-05-02 23:46:09', '2026-05-02 23:46:09'),
(19, 1, '2026-05-02 23:49:43', '2026-05-03 00:19:43', 0, 'in_progress', '2026-05-02 23:49:43', '2026-05-02 23:49:43'),
(20, 1, '2026-05-02 23:49:47', '2026-05-03 00:19:47', 0, 'in_progress', '2026-05-02 23:49:47', '2026-05-02 23:49:47');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `logId` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `actionType` enum('CANDIDATE_STAGE_CHANGED','ASSESSMENT_STARTED','ASSESSMENT_SUBMITTED','ASSESSMENT_FLAGGED','PROCTORING_VIOLATION','INTERVIEW_SCHEDULED','INTERVIEW_COMPLETED','SESSION_EXTENSION_REQUESTED','SESSION_EXTENSION_APPROVED','SESSION_EXTENSION_REJECTED','FEEDBACK_SUBMITTED','OFFER_GENERATED','OFFER_ACCEPTED','OFFER_REJECTED','RED_FLAG_RAISED','NOTIFICATION_SENT') NOT NULL,
  `affectedRecord` varchar(36) DEFAULT NULL,
  `affectedTable` varchar(100) DEFAULT NULL,
  `previousValue` text DEFAULT NULL,
  `newValue` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-a75f3f172bfb296f2e10cbfc6dfc1883', 'i:2;', 1777776647),
('laravel-cache-a75f3f172bfb296f2e10cbfc6dfc1883:timer', 'i:1777776647;', 1777776647),
('laravel-cache-hbasant219@gmail.com|127.0.0.1', 'i:3;', 1777771124),
('laravel-cache-hbasant219@gmail.com|127.0.0.1:timer', 'i:1777771124;', 1777771124);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `job_description` text NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `skill_weights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skill_weights`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `admin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`id`, `title`, `description`, `location`, `salary`, `admin_id`, `created_at`, `updated_at`) VALUES
(1, 'cyber', 'eee', 'giza', 333333.00, 1, '2026-05-02 22:19:20', '2026-05-02 22:19:20');

-- --------------------------------------------------------

--
-- Table structure for table `job_requisitions`
--

CREATE TABLE `job_requisitions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Draft','Pending Approval','Live','Closed','Archived') NOT NULL DEFAULT 'Draft',
  `total_weight` decimal(5,2) NOT NULL DEFAULT 0.00,
  `version_number` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_04_26_022746_create_job_posts_table', 1),
(6, '2026_04_26_164406_create_questions_table', 1),
(7, '2026_04_26_224339_create_options_table', 1),
(8, '2026_04_27_000001_create_job_requisitions_table', 1),
(9, '2026_04_27_000002_create_applications_table', 1),
(10, '2026_04_28_164338_create_job_postings_table', 1),
(11, '2026_05_01_160955_add_status_to_job_requisitions_table', 1),
(12, '2026_05_01_233547_create_clients_table', 1),
(13, '2026_05_02_120754_create_assessments_table', 1),
(14, '2026_05_02_121221_create_proctoring_violations_table', 1),
(15, '2026_05_02_121309_create_notifications_table', 1),
(16, '2026_05_02_121345_create_audit_logs_table', 1),
(17, '2026_05_03_020121_create_assessment_sessions_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notificationId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `triggeredBy` varchar(36) DEFAULT NULL,
  `type` enum('ASSESSMENT_FLAGGED','FEEDBACK_REMINDER','FEEDBACK_ESCALATION','SESSION_EXTENSION_REQUEST','SESSION_EXTENSION_APPROVED','SESSION_EXTENSION_REJECTED','STATUS_CHANGE','INTERVIEW_SCHEDULED','OFFER_SENT','RED_FLAG_RAISED') NOT NULL,
  `message` varchar(500) NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hypertext Preprocessor', 1, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(2, 1, 'Preprocessed Hypertext', 0, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(3, 2, 'True', 0, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(4, 2, 'False', 1, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(5, 3, 'Hypertext Preprocessor', 1, '2026-05-02 22:24:25', '2026-05-02 22:24:25'),
(6, 3, 'Preprocessed Hypertext', 0, '2026-05-02 22:24:25', '2026-05-02 22:24:25'),
(7, 4, 'True', 0, '2026-05-02 22:24:25', '2026-05-02 22:24:25'),
(8, 4, 'False', 1, '2026-05-02 22:24:25', '2026-05-02 22:24:25');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proctoring_violations`
--

CREATE TABLE `proctoring_violations` (
  `violationId` varchar(36) NOT NULL,
  `assessmentId` varchar(36) NOT NULL,
  `candidateId` varchar(36) NOT NULL,
  `type` enum('FOCUS_LOSS','TAB_SWITCH','WINDOW_LEAVE') NOT NULL,
  `duration_seconds` int(11) NOT NULL DEFAULT 0,
  `violation_count` int(11) NOT NULL DEFAULT 1,
  `is_flagged` tinyint(1) NOT NULL DEFAULT 0,
  `occurred_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `type` enum('mcq','true_false','open_text') NOT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL,
  `category` varchar(255) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `content`, `type`, `difficulty`, `category`, `points`, `created_at`, `updated_at`) VALUES
(1, 'What does PHP stand for?', 'mcq', 'easy', 'Backend', 5, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(2, 'Laravel is a Javascript Framework.', 'true_false', 'easy', 'Backend', 5, '2026-05-02 22:17:23', '2026-05-02 22:17:23'),
(3, 'What does PHP stand for?', 'mcq', 'easy', 'Backend', 5, '2026-05-02 22:24:25', '2026-05-02 22:24:25'),
(4, 'Laravel is a Javascript Framework.', 'true_false', 'easy', 'Backend', 5, '2026-05-02 22:24:25', '2026-05-02 22:24:25');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'CANDIDATE',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'bella kerhet 7ayatha', 'hbasant219@gmail.com', NULL, '$2y$10$9b.bcRZ1vCU5nD1pwobbVuy4tlt.7nxvMPGKzowpt2/m4jHyo7.ry', 'CANDIDATE', NULL, '2026-05-02 22:18:32', '2026-05-02 22:18:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applications_user_id_foreign` (`user_id`),
  ADD KEY `applications_job_requisition_id_foreign` (`job_requisition_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`assessmentId`);

--
-- Indexes for table `assessment_sessions`
--
ALTER TABLE `assessment_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_sessions_user_id_foreign` (`user_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`logId`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_posts_admin_id_foreign` (`admin_id`);

--
-- Indexes for table `job_requisitions`
--
ALTER TABLE `job_requisitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationId`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `options_question_id_foreign` (`question_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `proctoring_violations`
--
ALTER TABLE `proctoring_violations`
  ADD PRIMARY KEY (`violationId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `assessment_sessions`
--
ALTER TABLE `assessment_sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_requisitions`
--
ALTER TABLE `job_requisitions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_job_requisition_id_foreign` FOREIGN KEY (`job_requisition_id`) REFERENCES `job_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_sessions`
--
ALTER TABLE `assessment_sessions`
  ADD CONSTRAINT `assessment_sessions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
