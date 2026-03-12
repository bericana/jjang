import { useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formElement = e.currentTarget;
      const formDataToSend = new FormData(formElement);
      
      const response = await fetch('https://readdy.ai/api/form/d6p91ok4k19g20dvqn70', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formDataToSend as any).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', interest: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 이미지 섹션 */}
      <div className="w-full">
        <img 
          src="/banner.jpg"
          alt="짱한의원 1:1 맞춤형 프로그램"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 상담 신청 폼 섹션 */}
      <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              무료 상담 신청하기
            </h2>
            <p className="text-lg text-gray-600">
              개인의 체질과 라이프스타일에 맞춘 1:1 맞춤형 프로그램을 경험해보세요
            </p>
          </div>

          <form 
            id="consultation-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
          >
            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 <span className="text-pink-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  placeholder="이름을 입력해주세요"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  연락처 <span className="text-pink-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  placeholder="010-0000-0000"
                />
              </div>

              {/* 관심 프로그램 */}
              <div>
                <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">
                  관심 프로그램 <span className="text-pink-600">*</span>
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm cursor-pointer"
                >
                  <option value="">프로그램을 선택해주세요</option>
                  <option value="한방 다이어트 라인">한방 다이어트 라인</option>
                  <option value="시그니처 라인">시그니처 라인</option>
                  <option value="갱년기 프로그램">갱년기 프로그램</option>
                  <option value="기타 상담">기타 상담</option>
                </select>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? '전송 중...' : '무료 상담 신청하기'}
              </button>

              {/* 상태 메시지 */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center text-sm">
                  상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center text-sm">
                  전송 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">짱한의원</h3>
              <p className="text-pink-100 mb-2">개인의 체질과 라이프스타일에 맞춘</p>
              <p className="text-pink-100">1:1 맞춤형 프로그램</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">상담 문의</h4>
              <p className="text-3xl font-bold mb-2">02·515·1079</p>
              <p className="text-pink-100">평일 09:00 - 18:00</p>
              <p className="text-pink-100">토요일 09:00 - 14:00</p>
            </div>
          </div>
          <div className="border-t border-pink-400 pt-6 text-center text-pink-100 text-sm">
            <p>&copy; 2024 짱한의원. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
