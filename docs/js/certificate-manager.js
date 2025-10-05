// Certificate management utilities for Musanid Platform
// Handles issuing, retrieving, and storing completion certificates in localStorage.

class CertificateManager {
    constructor() {
        this.storageKey = 'musanid-certificate-registry';
        this.profileKey = 'musanid-user-profile';
        this.certificates = this._loadCertificates();
    }

    _loadCertificates() {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            return {};
        }

        try {
            const raw = window.localStorage.getItem(this.storageKey);
            if (!raw) {
                return {};
            }
            const parsed = JSON.parse(raw);
            return (parsed && typeof parsed === 'object') ? parsed : {};
        } catch (error) {
            console.warn('تعذر قراءة شهادات منصة مساند:', error);
            return {};
        }
    }

    _saveCertificates() {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            return;
        }

        try {
            window.localStorage.setItem(this.storageKey, JSON.stringify(this.certificates));
        } catch (error) {
            console.warn('تعذر حفظ شهادات منصة مساند:', error);
        }
    }

    _generateCertificateId(courseId = '') {
        const normalizedCourse = (courseId || 'MSN')
            .replace(/[^a-z0-9]/gi, '')
            .toUpperCase()
            .slice(0, 4) || 'MSN';
        const timestamp = Date.now().toString(36).toUpperCase();
        const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `MSN-${normalizedCourse}-${timestamp}-${randomSegment}`;
    }

    issueCertificate(courseId, details = {}) {
        if (!courseId) {
            throw new Error('Course ID is required to issue a certificate.');
        }

        const certificate = {
            certificateId: details.certificateId || this._generateCertificateId(courseId),
            courseId,
            courseTitle: details.courseTitle || '',
            courseBadge: details.courseBadge || '',
            userName: details.userName || '',
            score: typeof details.score === 'number' ? details.score : 100,
            lessonsCompleted: typeof details.lessonsCompleted === 'number' ? details.lessonsCompleted : null,
            totalLessons: typeof details.totalLessons === 'number' ? details.totalLessons : null,
            issuedAt: details.issuedAt || new Date().toISOString(),
            metadata: details.metadata || {}
        };

        this.certificates[courseId] = certificate;
        this._saveCertificates();

        if (certificate.userName) {
            this.updateProfile({
                fullName: certificate.userName,
                lastCourseId: courseId,
                lastCertificateId: certificate.certificateId,
                lastIssuedAt: certificate.issuedAt
            });
        }

        return certificate;
    }

    getCertificate(courseId) {
        if (!courseId) {
            return null;
        }
        return this.certificates?.[courseId] || null;
    }

    getAllCertificates(options = {}) {
        const { sort = 'desc' } = options;
        const certificates = Object.values(this.certificates || {});

        return certificates.sort((a, b) => {
            const timeA = a?.issuedAt ? Date.parse(a.issuedAt) || 0 : 0;
            const timeB = b?.issuedAt ? Date.parse(b.issuedAt) || 0 : 0;
            return sort === 'asc' ? timeA - timeB : timeB - timeA;
        });
    }

    getCertificateById(certificateId) {
        if (!certificateId) {
            return null;
        }
        return Object.values(this.certificates).find(cert => cert.certificateId === certificateId) || null;
    }

    hasCertificate(courseId) {
        return Boolean(this.getCertificate(courseId));
    }

    revokeCertificate(courseId) {
        if (!courseId || !this.certificates?.[courseId]) {
            return false;
        }
        delete this.certificates[courseId];
        this._saveCertificates();
        return true;
    }

    getProfile() {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            return null;
        }

        try {
            const raw = window.localStorage.getItem(this.profileKey);
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch (error) {
            console.warn('تعذر قراءة الملف الشخصي للمستخدم:', error);
            return null;
        }
    }

    setProfile(profile = {}) {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            return null;
        }

        const normalizedProfile = {
            ...profile,
            updatedAt: new Date().toISOString()
        };

        try {
            window.localStorage.setItem(this.profileKey, JSON.stringify(normalizedProfile));
        } catch (error) {
            console.warn('تعذر حفظ الملف الشخصي للمستخدم:', error);
        }

        return normalizedProfile;
    }

    updateProfile(partialProfile = {}) {
        const currentProfile = this.getProfile() || {};
        const nextProfile = {
            ...currentProfile,
            ...partialProfile,
            updatedAt: new Date().toISOString()
        };
        return this.setProfile(nextProfile);
    }
}

window.CertificateManager = window.CertificateManager || CertificateManager;
window.certificateManager = window.certificateManager || new CertificateManager();
